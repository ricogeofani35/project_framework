<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_quantity',
        'cart_date_order',
        'cart_time_order',
    ];

    // relasi many to many revrense
    public function product() 
    {
        return $this->belongsTo(Product::class);
    }
}
