//cara menampilkan image ke react js di storage laravel
1. rubah file di folder config/filesystem.php 
2. cari Links dan ubah menjadi  public_path('products') => storage_path('app/products')
3. lalu aktifkan dengan perintah php artisan storage:link
4. link akses image http://localhost:8000/products/name_image.jpg


/konfigurasi jwt
1. composer require php-open-source-saver/jwt-auth:1.4.2
2. php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
3. php artisan jwt:secret
4. di file config/auth.php configurasi
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [                  
        'driver' => 'jwt',  
        'provider' => 'users',
    ],
],

Dari perubahan kode di dalam model User, pertama kita import sebuah Interface dari JWT.

use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
Setelah itu, kita implement class User dengan JWTSubject.

class User extends Authenticatable implements JWTSubject //<-- implements JWTSubject
{

	
//...
Dan terakhir, kita menambahkan 2 method di dalam class User, yaitu getJWTIdentifier dan getJWTCustomClaims.

/**
* Get the identifier that will be stored in the subject claim of the JWT.
*
* @return mixed
*/
public function getJWTIdentifier()
{
    return $this->getKey();
}

/**
* Return a key value array, containing any custom claims to be added to the JWT.
*
* @return array
*/
public function getJWTCustomClaims()
{
    return [];
}