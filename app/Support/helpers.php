<?php

if (! function_exists('is_super_admin')) {
    /**
     * Is the user a super admin?
     *
     * @param null $user
     * @return void
     */
    function is_super_admin($user = null)
    {
        $user = $user ?: \Auth::user()->email;

        return strpos($user, config('app.users.super_admins')) !== false;
    }
}
