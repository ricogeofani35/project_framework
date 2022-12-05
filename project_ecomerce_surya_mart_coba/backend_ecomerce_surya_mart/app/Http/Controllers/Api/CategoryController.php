<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::latest()->paginate(10);

        return new CategoryResource(true, 'List Data Category', $category);
    }

    public function show(Category $category)
    {
        return new CategoryResource(true, 'List Data Category', $category);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name'        => 'required|unique:categories',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = Category::create([
            'category_name'        => $request->category_name
        ]);

        return new CategoryResource(true, 'create Category Date Successfully', $category);
    }

    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'category_name'        => 'required|unique:categories',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category->update([
            'category_name'        => $request->category_name
        ]);

        return new CategoryResource(true, 'update Category Date Successfully', $category);
    }

    public function destroy(Category $category)
    {
        Product::where('category_id', $category->id)->update([
            'category_id'   => null
        ]);
        $category->delete();

        return new CategoryResource(true, 'delete Category Date Successfully', null);
    }
}
