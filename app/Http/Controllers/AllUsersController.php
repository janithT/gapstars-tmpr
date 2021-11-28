<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AllUsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Index resource
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {
        $allusers = User::get();

        $allusers->each(function ($allusers) {
            $allusers->append('avatar');
            $allusers->append('isSuspended');
        });

        return response()->json([
            'data' => $allusers
        ]);
    }

    /**
     * Get single resource
     *
     * @param User $client
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show( User $user ) {
        $user->append('avatar');
        $user->append('avatar_filename');
        $user->append('created_mm_dd_yyyy');

        return response()->json([
            'data' => $user
        ]);
    }

    /**
     * Update single resource
     *
     * @param UserStoreRequest $request
     * @param user $client
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update( UserStoreRequest $request, User $user ) {
        $user->fill($request->all());
       // $user['password'] = bcrypt($request->password);
        $user->save();

        //$user->append('avatar');

        return response()->json([
            'status' => true,
            'data' => $user
        ]);
    }

    /**
     * Store new resource
     *
     * @param UserStoreRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store( UserStoreRequest $request ) {
        $user = new User;
        $user->fill($request->all());
        $user['password'] = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'created' => true,
            'data' => [
                'id' => $user->id
            ]
        ]);
    }

    /**
     * Destroy single resource
     *
     * @param user $client
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy( User $user ) {
        $user->delete();

        return response()->json([
            'status' => true
        ]);
    }

    /**
     * Destroy resources by ids
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyMass( Request $request ) {
        $request->validate([
            'ids' => 'required|array'
        ]);

        user::destroy($request->ids);

        return response()->json([
            'status' => true
        ]);
    }
}
