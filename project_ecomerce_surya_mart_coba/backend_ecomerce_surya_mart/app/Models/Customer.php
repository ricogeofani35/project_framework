<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'customer_email',
        'customer_password',
        'customer_alamat',
        'customer_notelp'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // relasi one to many revrese
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
