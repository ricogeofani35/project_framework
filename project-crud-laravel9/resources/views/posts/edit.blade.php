@include('../templates/header')
    
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <form action="{{ route('posts.update', $post->id) }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')

                            <div class="form-group">
                                <label class="font-weight-bold">
                                    Gambar
                                </label>
                                <input type="file" class="form-control @error('image') is-invalid @enderror" name="image">

                                {{-- error message untuk image --}}
                                @error('image')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label class="font-weight-bold">Title</label>
                                <input type="text" class="form-control @error('title') is-invalid @enderror" name="title" value="{{ old('title', $post->title) }}" placeholder="Masukan Judul post">

                                 {{-- error message untuk title --}}
                                 @error('title')
                                 <div class="alert alert-danger mt-2">
                                     {{ $message }}
                                 </div>
                             @enderror
                            </div>
                            <div class="form-group">
                                <label class="font-weight-bold">Content</label>
                                <textarea class="form-control @error('content') is-invalid @enderror" name="content" rows="5" placeholder="Masukan Content post">{{ old('content', $post->content) }}</textarea>

                                 {{-- error message untuk title --}}
                                 @error('content')
                                 <div class="alert alert-danger mt-2">
                                     {{ $message }}
                                 </div>
                             @enderror
                            </div>

                            <button type="submit" class="btn btn-md btn-primary">Update</button>
                            <button type="reset" class="btn btn-md btn-warning">Reset</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('../templates/footer')

    <script>
        CKEDITOR.replace( 'content' );
    </script>