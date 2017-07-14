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

if (! function_exists('to_pt_br_date')) {
    /**
     * Is the user a super admin?
     *
     * @param null $user
     * @return void
     */
    function to_pt_br_date($user = null)
    {
        $user = $user ?: \Auth::user()->email;

        return strpos($user, config('app.users.super_admins')) !== false;
    }
}
