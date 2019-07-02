<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\User;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */

    public function getUserByID( $id ){
      $data = array();
      $get_user = User::where('id', $id)->first();
      if( $get_user ){
        $data['status'] = true;
        $data['message'] = 'Success';
        $data['user'] = $get_user;
      }else{
        $data['status'] = false;
        $data['message'] = 'Failed';
      }
      return $data;
    }


}


