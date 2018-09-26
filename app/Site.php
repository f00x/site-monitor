<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model {
    protected $fillable = ['domain_name'];
    protected $table = 'site';
    public function getListEventPosition() {
        return $this->hasMany(EventPosition::class);
    }

}
