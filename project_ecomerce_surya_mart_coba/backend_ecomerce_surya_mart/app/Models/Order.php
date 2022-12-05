<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_quantity',
        'order_date',
        'order_time',
        'order_status'
    ];

    // relasi one to one
    public function report_order()
    {
        return $this->hasOne(Report_order::class);
    }

    // relasi one to many
    public function customer()
    {
        return $this->hasMany(Customer::class);
    }

    // relasi many to many
    public function product()
    {
        return $this->belongsToMany(Product::class, 'detail_orders');
    }
}
