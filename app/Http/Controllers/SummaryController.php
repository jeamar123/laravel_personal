<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\Income;
use App\Expenses;
use App\Category;
use DB;

class SummaryController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */

    public function getSummaryByMonth( Request $request ){
        $data = array();
        $weekly_values = array();
        $category_values = array();
        $day_names = [ 'Mon','Tue','Wed','Thu','Fri','Sat','Sun' ];
        $startDate = new DateTime( $request->get('start') );
        $endDate = new DateTime( $request->get('end') );
        $month = date( 'M', strtotime( $request->get('start') ) );
        $year = date( 'Y', strtotime( $request->get('start') ) );
        $num_days = $startDate->diff( $endDate );
        $total_expenses = 0;
        $total_income = 0;
        $temp_value = 0;


        $get_category_list = Category::get();
        $get_income = Income::whereBetween('full_date', [ $startDate, $endDate ])
            ->where('user_id', $request->get('user_id'))
            ->get();
        $get_expenses = Expenses::whereBetween('full_date', [ $startDate, $endDate ])
            ->selectRaw( 'expenses.*, sum(expenses.value) as value, category.name as category_name' )
            ->join('category', 'expenses.category_id', '=', 'category.id')
            ->where('expenses.user_id', $request->get('user_id'))
            ->orderBy('expenses.full_date')
            ->groupBy('expenses.full_date')
            ->get();
        $get_categories = Expenses::whereBetween('full_date', [ $startDate, $endDate ])
            ->selectRaw( 'expenses.*, sum(expenses.value) as value, category.name as category_name' )
            ->join('category', 'expenses.category_id', '=', 'category.id')
            ->where('expenses.user_id', $request->get('user_id'))
            ->orderBy('expenses.full_date')
            ->groupBy('category.name')
            ->get();

         $test = array();   
         $test_temp = array();   
        
        for( $i = 0; $i < $num_days->d + 1; $i++ ){
          for( $x = 0; $x < count( $get_expenses ); $x++ ){
            if( $get_expenses[$x]->full_date == date( 'Y-m-d', strtotime( $month . ' ' . ($i+1) . ' ' .$year ) ) ){
              $temp_value += $get_expenses[$x]->value;
            }
          }
          array_push( $test_temp, date( 'Y-m-d', strtotime( $month . ' ' . ($i+1) . ' ' .$year ) ) );
          if( array_search( date( 'D', strtotime( $month . ' ' . ($i+1) . ' ' .$year ) ), $day_names) + 1 == 7 || $i == $num_days->d ){
            array_push($weekly_values, $temp_value );
            array_push($test, $test_temp );
            $temp_value = 0;
            $test_temp = array();  
          }
        }
        for( $i = 0; $i < count( $get_category_list ); $i++ ){
          $temp_arr = array( 'name' => $get_category_list[$i]->name, 'value' => 0);
          for( $x = 0; $x < count( $get_categories ); $x++ ){
            if( $get_category_list[$i]->name == $get_categories[$x]->category_name ){
              $temp_arr['value'] = $get_categories[$x]->value;
            }
          }
          array_push( $category_values, $temp_arr);
        }
        for( $i = 0; $i < count( $get_expenses ); $i++ ){
          $total_expenses += $get_expenses[$i]->value;
        }
        for( $i = 0; $i < count( $get_income ); $i++ ){
          $total_income += $get_income[$i]->value;
        }
        

        $data['status'] = true;
        $data['message'] = 'Success';
        $data['monthly_income'] = $total_income;
        $data['monthly_expenses'] = $total_expenses;
        $data['weekly_values'] = $weekly_values;
        $data['category_values'] = $category_values;
        $data['test'] = $test;

        return $data;
    }


}


