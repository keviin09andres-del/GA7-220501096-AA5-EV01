package com.sena.appmobile.data.repository

import com.sena.appmobile.data.LoginRequest
import com.sena.appmobile.data.api.RetrofitClient
import retrofit2.Response

class AuthRepository {
    private val apiService = RetrofitClient.apiService

    suspend fun login(request: LoginRequest): Response<Map<String, Any>> {
        return apiService.login(null, request)
    }
}