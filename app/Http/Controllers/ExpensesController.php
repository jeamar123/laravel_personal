<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\Expenses;

class ExpensesController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function getExpenses( ){
        return Expenses::orderBy('created_at', 'asc')->get();
    }

    public function getExpensesByMonth( Request $request ){
        $data = array();
        $week_names = array( 0 => "Mon", 1 => "Tue", 2 => "Wed", 3 => "Thu", 4 => "Fri", 5 => "Sat", 6 => "Sun" );
        $dates_arr = array();
        $startDate = new DateTime( $request->get('start') );
        $endDate = new DateTime( $request->get('end') );
        $month = date( 'M', strtotime( $request->get('start') ) );
        $year = date( 'Y', strtotime( $request->get('start') ) );
        $num_days = $startDate->diff( $endDate );
        $total_expenses = 0;

        $get_expenses = Expenses::whereBetween('full_date', [ $startDate, $endDate ])
            ->orderBy('full_date')
            ->join('category', 'expenses.category_id', '=', 'category.id')
            ->select( 'expenses.*', 'category.name as category_name' )
            ->where('user_id', $request->get('user_id'))
            ->get();



        for( $i = 0; $i < $num_days->d + 1; $i++ ){
            $temp_arr = array( 
                "day" => date( 'D', strtotime( $month . ' ' . ($i+1) . ' ' .$year ) ),
                "full_date" => date( 'Y-m-d', strtotime( $month . ' ' . ($i+1) . ' ' .$year ) ),
                "expenses" => array(), 
                "total" => 0
            );
            for( $x = 0; $x < count( $get_expenses ); $x++ ){
                if( $get_expenses[$x]->full_date == $temp_arr['full_date'] ){
                    $temp_arr['total'] += $get_expenses[$x]->value;
                    array_push( $temp_arr['expenses'], $get_expenses[$x] );
                }
                if( $x == count( $get_expenses ) - 1 ){
                    array_push( $dates_arr, $temp_arr );
                }
            }

          if( $i == $num_days->d && count( $dates_arr ) > 0 ){
            $temp_day = $dates_arr[0]['day'];
            $temp_name = array();
            $y = 0;
            while ( $y < 6 ) {
              if( $week_names[$y] != $temp_day ){
                $temp_arr = array( 
                  "name" => $week_names[$y],
                  "total" => 0,
                  "isDisabled" => true
                );
                array_push( $temp_name, $temp_arr);
                $y += 1;
              }else{
                for( $j = count($temp_name)-1; $j >= 0; $j-- ){
                  array_unshift( $dates_arr, $temp_name[$j] );
                }
                $y = 7;
              }
            }
          }
        }


        
        for( $i = 0; $i < count( $get_expenses ); $i++ ){
            $total_expenses += $get_expenses[$i]->value;
        }
        
        if( $get_expenses ){
            $data['status'] = true;
            $data['message'] = 'Success';
            $data['expenses'] = $dates_arr;
            $data['monthly_total'] = $total_expenses;
        }else{
            $data['status'] = false;
            $data['message'] = 'Failed';
        }

        return $data;
    }

    public function addExpenses( Request $request ){
        $data = array();
        $create = Expenses::create([
                    // 'category_id' => $request->get('category_id'),   
                    'full_date' => $request->get('full_date'),
                    'day' => $request->get('day'),
                    'month' => $request->get('month'),
                    'year' => $request->get('year'),
                    'category_id' => $request->get('category_id'),
                    'description' => $request->get('description'),
                    'value' => $request->get('value'),
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

    public function updateExpenses( Request $request ){
        $data = array();
        
        $update_data = array(
            'description' => $request->get('description'),
            'value' => $request->get('value'),
            'category_id' => $request->get('category_id'),
        );

        $result = Expenses::where('id', $request->get('id'))->update($update_data);
        if($result) {
            $data['status'] = true;
            $data['message'] = 'Successfully updated.';
        } else {
            $data['status'] = false;
            $data['message'] = 'Failed';
        }
        return $data;
    }

    public function deleteExpenses( Request $request ){
        $data = array();
        $ids_arr = $request->get('ids_arr');

        for( $i = 0; $i < count( $ids_arr ); $i++ ){
            Expenses::where('id', '=', $ids_arr[$i])->delete();
        }

        $data['status'] = true;
        $data['message'] = 'Successfully deleted.';
        
        return $data;
    }

}