<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\Income;

class IncomeController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function getIncome( ){
        return Income::orderBy('created_at', 'asc')->get();
    }

    public function getIncomeByMonth( Request $request ){
        $data = array();

        $get_income = Income::whereBetween('full_date', [ new DateTime( $request->get('start') ) , new DateTime( $request->get('end') ) ])->where('user_id', $request->get('user_id'))->get();
        
        $total_income = 0;

        for( $i = 0; $i < count( $get_income ); $i++ ){
            $total_income += $get_income[$i]->value;
        }

        if( $get_income ){
            $data['status'] = true;
            $data['message'] = 'Success';
            $data['income'] = $get_income;
            $data['monthly_income'] = $total_income;
        }else{
            $data['status'] = false;
            $data['message'] = 'Failed';
        }

        return $data;
    }

    public function addIncome( Request $request ){
        $data = array();
        $create = Income::create([
                    'full_date' => $request->get('full_date'),
                    'day' => $request->get('day'),
                    'month' => $request->get('month'),
                    'year' => $request->get('year'),
                    'description' => $request->get('description'),
                    'value' => $request->get('value'),
                    'user_id' => $request->get('user_id'),
                ]);

        if( $create ){
            $data['status'] = true;
            $data['message'] = 'Successfully added.';
        } else {
            $data['status'] = false;
            $data['message'] = 'Failed';
        }

        return $data;
    }

    public function updateIncome( Request $request ){
        $data = array();
        
        $update_data = array(
            'full_date' => $request->get('full_date'),
            'day' => $request->get('day'),
            'month' => $request->get('month'),
            'year' => $request->get('year'),
            'description' => $request->get('description'),
            'value' => $request->get('value'),
        );

        $result = Income::where('id', $request->get('id'))->update($update_data);
        if($result) {
            $data['status'] = true;
            $data['message'] = 'Successfully updated.';
        } else {
            $data['status'] = false;
            $data['message'] = 'Failed';
        }
        return $data;
    }

    public function deleteIncome( Request $request ){
        $data = array();
        $ids_arr = $request->get('ids_arr');

        for( $i = 0; $i < count( $ids_arr ); $i++ ){
            Income::where('id', '=', $ids_arr[$i])->delete();
        }

        $data['status'] = true;
        $data['message'] = 'Successfully deleted.';
        
        return $data;
    }

}