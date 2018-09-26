<?php

namespace App\Http\Controllers\API;

use App\EventPosition;
use App\Http\Controllers\Controller;
use App\Site;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use function response;

class EventPositionController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $EventPosition = EventPosition::create($request->all());
        $Site = Site::firstOrCreate(['domain_name'=>$request->get('domain_name')]);
        $Site->getListEventPosition()->save($EventPosition);
        return response()->json(['status' => 'ok']);
    }

    /**
     * Display the specified resource.
     *
     * @param  EventPosition  $eventPosition
     * @return Response
     */
    public function show(EventPosition $eventPosition) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  EventPosition  $eventPosition
     * @return Response
     */
    public function update(Request $request, EventPosition $eventPosition) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  EventPosition  $eventPosition
     * @return Response
     */
    public function destroy(EventPosition $eventPosition) {
        //
    }

}
