@include('../templates/header')

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <a href="{{ route('posts.create') }}" class="btn btn-md btn-success mb-3">Tambah Post</a>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <td scope='col'>Gambar</td>
                                    <td scope='col'>Judul</td>
                                    <td scope='col'>Content</td>
                                    <td scope='col'>Aksi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {{-- karana datanya berupa array --}}
                                @forelse ($posts as $post)
                                    <tr>
                                        <td class="text-center">
                                            <img src="{{ Storage::url('public/posts/').$post->image }}" class="rounded" style="width: 100px">
                                        </td>
                                        <td>
                                            {{ $post->title }}
                                        </td>
                                        <td>
                                            {{ $post->content }}
                                        </td>
                                        <td class="text-center">
                                            <form onsubmit="return confirm('Apakah Anda Yakin!!')" action="{{ route('posts.destroy', $post->id) }}" method="POST" class="d-flex gap-2 flex-wrap">
                                                <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-sm btn-primary">Edit</a>
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-sm btn-danger">Hapus</button>
                                            </form>
                                        </td>
                                    </tr>
                                    @empty
                                        <div class="alert alert-danger">
                                            Data Posts Belum Tersedia
                                        </div>
                                @endforelse
                            </tbody>
                        </table>
                        {{-- untuk memberikan paggination --}}
                        {{ $posts->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // pesan dengan toastr
        @if(session()->has('success'))
            toastr.success('{{ session('success') }}', 'BERHASIL!!')
        @elseif (session()->has('error'))
            toastr.error('{{ session('error') }}', 'GAGAL!!')
        @endif
    </script>

@include('../templates/footer')