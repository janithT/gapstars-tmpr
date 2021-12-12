<?php

/**
 * @SWG\Swagger(
 *     basePath="",
 *     schemes={"http", "https"},
 *     host=L5_SWAGGER_CONST_HOST,
 *     @SWG\Info(
 *         version="1.0.0",
 *         title="Gapstart-tmpr API documentation",
 *         description="Gapstart-tmpr API documentation",
 *         @SWG\Contact(
 *             email="info@example.com"
 *         ),
 *     )
 * )
 */

 /**
 *
 *      @SWG\Post(
 *      path="/register",
 *      tags={"tmpr - User Auth Operations"},
 *      operationId="userregister",
 *      summary="tmpr user registration",
 *        @SWG\Parameter(
 *          name="name",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 *       @SWG\Parameter(
 *          name="email",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 *      @SWG\Parameter(
 *          name="phone",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 *       @SWG\Parameter(
 *          name="password",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 *        @SWG\Parameter(
 *          name="password_confirmation",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 * 
 *        @SWG\Parameter(
 *          name="active",
 *          required=true,
 *          type="integer",
 *          in="formData",
 *          default="1",
 *          
 *      ),
 *      @SWG\Response(response=200,description="successful operation"),
 *      @SWG\Response(response=302,description="Found"),
 *      @SWG\Response(response=401,description="Unauthorized action."),
 *      @SWG\Response(response=403,description="Forbidden to access."),
 *      @SWG\Response(response=500,description="Server Error"),

 *  )
 *
*/


/**
 *
 *      @SWG\Post(
 *      path="/login",
 *      tags={"tmpr - User Auth Operations"},
 *      operationId="userlogin",
 *      summary="tmpr user login",
 *       @SWG\Parameter(
 *          name="email",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 *      @SWG\Parameter(
 *          name="password",
 *          required=true,
 *          type="string",
 *          in="formData"
 *      ),
 *      @SWG\Response(response=200,description="successful operation"),
 *      @SWG\Response(response=302,description="Found"),
 *      @SWG\Response(response=401,description="Unauthorized action."),
 *      @SWG\Response(response=403,description="Forbidden to access."),
 *      @SWG\Response(response=500,description="Server Error"),

 *  )
 *
*/

/**
 *
 *      @SWG\Post(
 *      path="/logout",
 *      tags={"tmpr - User Auth Operations"},
 *      operationId="userlogout",
 *      summary="tmpr user logout",
 *      @SWG\Response(response=200,description="successful operation"),
 *      @SWG\Response(response=302,description="Found"),
 *      @SWG\Response(response=401,description="Unauthorized action."),
 *      @SWG\Response(response=403,description="Forbidden to access."),
 *      @SWG\Response(response=500,description="Server Error"),

 *  )
 *
*/

/**
 *
 *      @SWG\Get(
 *      path="/csv/userdata",
 *      tags={"tmpr - User CSV Data"},
 *      operationId="csvdata",
 *      summary="tmpr user return csv data",
 *      @SWG\Response(response=200,description="successful operation"),
 *      @SWG\Response(response=302,description="Found"),
 *      @SWG\Response(response=401,description="Unauthorized action."),
 *      @SWG\Response(response=403,description="Forbidden to access."),
 *      @SWG\Response(response=500,description="Server Error"),
 *  )
 *
*/