<?php

namespace App;

use App\Processors\AvatarProcessor;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'phone', 'password', 'active', 'isAdmin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function file() {
        return $this->belongsTo(File::class);
    }

    public function getAvatarAttribute() {
        return AvatarProcessor::get($this);
    }

    public function isSuspended(){
		if($this->active)
			return false;
		return true;
    }

    public function getIsSuspendedAttribute(){

        if($this->active)
			return 'yes';
		return 'No';
    }
    public function isAdmin(){
        return $this->isAdmin;
    }

    public function getAvatarFilenameAttribute() {
        if (!empty($this->file)) {
            return $this->file->name;
        }

        return null;
    }


    public function getCreatedAttribute() {
        if (empty($this->created_at)) {
            return null;
        }

        return $this->created_at->toFormattedDateString();
    }

    public function getCreatedMmDdYyyyAttribute() {
        if (empty($this->created_at)) {
            return null;
        }

        return $this->created_at->format('m-d-Y');
    }

    public function setCreatedDateAttribute( $value ) {
        try {
            $this->attributes['created_at'] = new Carbon($value);
        } catch (\Exception $exception) {
            $this->attributes['created_at'] = now();
        }
    }
}
