<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_kode',
        'product_image',
        'product_name',
        'product_price',
        'product_stock',
        'product_desc',
        'category_id'
    ];

    // relasi one to many revres
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // relasi many to many
    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    // relasi many to many
    public function order()
    {
        return $this->belongsToMany(Order::class, 'detail_orders');
    }
}
