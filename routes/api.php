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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
    
    
    
});
Route::post('/site/event/register', 'API\EventPositionController@store');

Route::get('/site/event-list/{site}', 'API\EventPositionController@showBySite');
Route::get('/site/list', 'API\SiteController@index');