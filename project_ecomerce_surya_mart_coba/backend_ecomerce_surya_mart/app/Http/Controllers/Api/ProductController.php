<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product; //import modal
use App\Http\Resources\ProductResource; //import resource
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // display data
    public function index()
    {
        // get data
        $products = Product::with('category')->paginate(10);

        //return collection of posts as a resource
        return new ProductResource(true, 'List Data Products', $products);
    }

    // display for detail data
    public function show(Product $product)
    {
        return new ProductResource(true, 'Data Product Ditemukan!!', $product);
    }

    // create data
    public function store(Request $request)
    {
        // validasi
        $validator = Validator::make($request->all(), [
            'product_kode'      => 'required|unique:products',
            'product_image'     => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'product_name'      => 'required',
            'product_price'      => 'required',
            'product_stock'      => 'required',
            'product_desc'      => 'required',
            'category_id'       => 'required'
        ]);

        // jika validasi error
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // upload image to public
        $product_image = $request->file('product_image');
        $product_image->storeAs('products', $product_image->hashName());

        // create data product to database
        $product = Product::create([
            'product_kode'  => $request->product_kode,
            'product_image' => $product_image->hashName(),
            'product_name'  => $request->product_name,
            'product_price'  => $request->product_price,
            'product_stock'  => $request->product_stock,
            'product_desc'  => $request->product_desc,
            'category_id'   => $request->category_id
        ]);

        return new ProductResource(true, 'Product data added successfully', $product);

    }

    // update data
    public function update(Request $request, Product $product)
    {
        // validasi
        $validator = Validator::make($request->all(), [
            'product_name'      => 'required',
            'product_price'      => 'required',
            'product_stock'      => 'required',
            'product_desc'      => 'required',
            'category_id'       => 'required'
        ]);

        // jika validasi error
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // cek image is not empty
        if($request->hasFile('product_image')) {
            // get image for user
            $newProduct_image = $request->file('product_image');
            $newProduct_image->storeAs('products/', $newProduct_image->hashName());

            // delete old image
            Storage::delete('products/'.$product->product_image);

            $product->update([
                'product_kode'  => $product->product_kode,
                'product_image' => $newProduct_image->hashName(),
                'product_name'  => $request->product_name,
                'product_price'  => $request->product_price,
                'product_stock'  => $request->product_stock,
                'product_desc'  => $request->product_desc,
                'category_id'   => $request->category_id
            ]);
        } else {
            $product->update([
                'product_kode'  => $product->product_kode,
                'product_name'  => $request->product_name,
                'product_price'  => $request->product_price,
                'product_stock'  => $request->product_stock,
                'product_desc'  => $request->product_desc,
                'category_id'   => $request->category_id
            ]);
        }

        return new ProductResource(true, 'Update Date Product successfully', $product);
    }

    // delete date product
    public function destroy(Product $product)
    {
        Storage::delete('products/'.$product->product_image);

        $product->delete();

        return new ProductResource(true, 'Delete Date Product successfully', null);
    }
}
