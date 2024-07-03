<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::with('user')->get();
        return inertia()->render('Posts/index', [
            'posts' => PostResource::collection($posts),
            'now' => now(),
            'can' => [
                'post_create' => auth()->user()->can('create', Post::class),
            ],
        ]);
    }

    public function store(StorePostRequest $request) {
        sleep(5);
        auth()->user()->posts()->create($request->validated());
        return redirect()->route('posts.index')->with('message', [
            'type' => 'success',
            'body' => 'Post created successfully.'
        ]);
    }
}
