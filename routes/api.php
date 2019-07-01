<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', 'AuthController@login');
Route::post('/signup', 'AuthController@register');

Route::get('/expenses', 'ExpensesController@getExpenses');
Route::post('/expenses/month', 'ExpensesController@getExpensesByMonth');
Route::post('/expenses/add', 'ExpensesController@addExpenses');
Route::post('/expenses/update', 'ExpensesController@updateExpenses');
Route::post('/expenses/delete', 'ExpensesController@deleteExpenses');

Route::get('/expenses_categories', 'ExpensesCategoryController@getCategories');

Route::get('/income', 'IncomeController@getIncome');
Route::post('/income/month', 'IncomeController@getIncomeByMonth');
Route::post('/income/add', 'IncomeController@addIncome');
Route::post('/income/update', 'IncomeController@updateIncome');
Route::post('/income/delete', 'IncomeController@deleteIncome');

Route::post('/summary/month', 'SummaryController@getSummaryByMonth');