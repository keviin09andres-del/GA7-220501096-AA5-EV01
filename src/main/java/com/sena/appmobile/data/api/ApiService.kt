package com.sena.appmobile.data.api

import com.sena.appmobile.data.LoginRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("api/auth/login") // Ajusta esta ruta según la ruta de tu API web
    suspend fun login(
        @retrofit2.http.Header("Authorization") token: String?,
        @Body request: LoginRequest
    ): Response<Map<String, Any>>
}