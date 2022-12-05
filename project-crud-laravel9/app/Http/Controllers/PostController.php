<?php

namespace App\Http\Controllers;

// mengimport file Post.php
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // display data
    public function index()
    {
        $posts = Post::latest()->paginate(5);

        return view('posts.index', compact('posts'));
    }

    // create page crate posts
    public function create()
    {
        return view('posts.create');
    }

    // store posts to database
    public function store(Request $request)
    {
        // validate form
        $this->validate($request, [
            'image'   => 'required|image|mimes:png,jpg,jpeg,gif,svg|max:2048',
            'title'   => 'required|min:5',
            'content' => 'required|min:10'
        ]);

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/posts', $image->hashName());

        // create posts //menggunakan Eloquent
        Post::create([
            'image'   => $image->hashName(),
            'title'   => $request->title,
            'content' => $request->content
        ]);

        // redirect halam saat data berhasil di simpan
        return redirect()->route('posts.index')->with(['success' => 'Data Berhasil Disimpan!']);

    }

    public function edit(Post $post) 
    {
        return view('posts.edit', compact('post'));
    }

    // update data
    public function update(Request $request, Post $post)
    {
        // validate form
        $this->validate($request, [
            'image'   => 'image|mimes:png,jpg,jpeg,gif,svg|max:2048',
            'title'   => 'required|min:5',
            'content' => 'required|min:10'
        ]);

        // check if image is upload
        if($request->hasFile('image'))
        {
            // upload new image
            $image = $request->file('image');
            $image->storeAs('public/posts', $image->hashName());

            // delete old image
            Storage::delete('public/posts/'.$post->image);

            // update post with new image
            $post->update([
                'image'     => $image->hashName(),
                'title'     => $request->title,
                'content'   => $request->content
            ]);
        } else {
            // update post tanpa image
            $post->update([
                'title'     => $request->title,
                'content'   => $request->content
            ]);
        }

        return redirect()->route('posts.index')->with(['success' => 'Data Berhasil Diubah!!']);
    }

    // delete data form database
    public function destroy(Post $post)
    {
        // delete image
        Storage::delete('public/posts/'. $post->image);

        // delete posts
        $post->delete();

        // redirect halaman ke index
        return redirect()->route('posts.index')->with(['success' => 'Data berhasil Dihapus!']);
    }
}
