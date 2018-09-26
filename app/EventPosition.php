<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventPosition extends Model {
    protected $fillable = ['event_key','x','y'];
    protected $table = 'event_position';
    public function getSite() {
        return $this->belongsTo(Site::class); 
    }

}
