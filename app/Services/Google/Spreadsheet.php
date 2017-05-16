<?php

namespace App\Services\Google;

use Google\Spreadsheet\DefaultServiceRequest;
use Google\Spreadsheet\ServiceRequestFactory;
use Google\Spreadsheet\SpreadsheetService;
use Google_Client;
use Google_Service_Sheets;

class Spreadsheet
{
    public function __construct()
    {
        $accessTokenPath = base_path('.google.access.token.json');

        $client = new Google_Client();
        $client->setApplicationName('Carteirada do Bem Spreadsheet Server');
        $client->setAuthConfig($credentialsPath = base_path('.google.json'));
        $client->setScopes([Google_Service_Sheets::SPREADSHEETS]);
        $client->setAccessType('offline');
        $client->setRedirectUri(route('google.callback'));

        if (file_exists($accessTokenPath)) {
            $client->setAccessToken(json_decode(file_get_contents($accessTokenPath), true));
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
//            printf("Open the following link in your browser:\n%s\n", $authUrl);
//            print 'Enter verification code: ';
//            $authCode = trim(fgets(STDIN));

            return redirect($authUrl);

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);

            // Store the credentials to disk.
            if(!file_exists(dirname($credentialsPath))) {
                mkdir(dirname($credentialsPath), 0700, true);
            }
            file_put_contents($credentialsPath, json_encode($accessToken));
            printf("Credentials saved to %s\n", $credentialsPath);
        }

        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
        }

        $obj_token  = json_decode($client->getAccessToken());
        $accessToken = $obj_token->access_token;

        $serviceRequest = new DefaultServiceRequest($accessToken);
        ServiceRequestFactory::setInstance($serviceRequest);

        $spreadsheetService = new SpreadsheetService();
        $spreadsheetFeed = $spreadsheetService->getSpreadsheetFeed();

        $spreadsheet = $spreadsheetFeed->getByTitle('MySpreadsheet');

        $spreadsheet = $spreadsheetFeed->getByTitle('MySpreadsheet');
        $worksheetFeed = $spreadsheet->getWorksheetFeed();
    }
}
