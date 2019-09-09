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

    public function updateUser( Request $request ){
      $data = array();
      
      $update_data = array(
        'name' => $request->get('name'),
        'email' => $request->get('email'),
      );

      $count = User::where('id', '!=', $request->get('id'))
                    ->where('email', '=', $request->get('email'))->count();
      if($count > 0) {
        $data['status'] = false;
        $data['message'] = 'Email already taken.';
        return $data;
      }

      $result = User::where('id', $request->get('id'))->update($update_data);
      if($result) {
        $data['status'] = true;
        $data['message'] = 'Successfully updated.';
      } else {
        $data['status'] = false;
        $data['message'] = 'Failed';
      }
      return $data;
    }

    public function updatePassword( Request $request ){
      $data = array();

      $count = User::where('id', '=', $request->get('id'))
                  ->where('password', '=', md5($request->get('password')) )
                  ->count();
      
      if($count == 0) {
        $data['status'] = false;
        $data['message'] = 'Incorrect Password.';
        return $data;
      }

      $update_data = array(
        'password' => md5($request->get('new_password')),
      );

      $result = User::where('id', $request->get('id'))->update($update_data);
      if($result) {
        $data['status'] = true;
        $data['message'] = 'Successfully updated.';
      } else {
        $data['status'] = false;
        $data['message'] = 'Failed';
      }
      return $data;
    }


}


