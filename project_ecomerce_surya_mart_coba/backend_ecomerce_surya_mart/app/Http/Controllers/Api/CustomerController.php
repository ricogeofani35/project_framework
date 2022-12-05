<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Resources\CustomerResource;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function index()
    {
        $customer = Customer::latest()->paginate(10);

        return new CustomerResource(true, 'List Data Customer', $customer);
    }

    public function show(Customer $customer)
    {
        return new CustomerResource(true, 'Detail Customer Date', $customer);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name'        => 'required',
            'customer_email'        => 'required|email|unique:Customers',
            'customer_password'        => 'required|min:6',
            'customer_alamat'        => 'required',
            'customer_notelp'        => 'required'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $customer = Customer::create([
            'customer_name'     => $request->customer_name,
            'customer_email'     => $request->customer_email,
            'customer_password'     => bcrypt($request->customer_password),
            'customer_alamat'     => $request->customer_alamat,
            'customer_notelp'     => $request->customer_notelp,
        ]);

        return new CustomerResource(true, 'Create Customer Date Successfuly', $customer);
    }

    public function update(Request $request, Customer $customer)
    {
        $validator = Validator::make($request->all(), [
            'customer_name'        => 'required',
            'customer_email'        => 'required|email|unique:Customers',
            'customer_password'        => 'required|min:6',
            'customer_alamat'        => 'required',
            'customer_notelp'        => 'required'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $customer->update([
            'customer_name'     => $request->customer_name,
            'customer_email'     => $request->customer_email,
            'customer_password'     => bcrypt($request->customer_password),
            'customer_alamat'     => $request->customer_alamat,
            'customer_notelp'     => $request->customer_notelp,
        ]);

        return new CustomerResource(true, 'Update Customer Date Successfuly', $customer);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return new CustomerResource(true, 'Delete Customer Date Successfuly', null);
    }
}
