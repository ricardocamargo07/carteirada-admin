<?php

if (! function_exists('is_super_admin')) {
    /**
     * Is the user a super admin?
     *
     * @param null $user
     * @return bool
     */
    function is_super_admin($user = null)
    {
        $user = $user ?: \Auth::user()->email;

        $admins = config('app.users.super_admins');

        return filled($admins) && strpos($user, $admins) !== false;
    }
}
