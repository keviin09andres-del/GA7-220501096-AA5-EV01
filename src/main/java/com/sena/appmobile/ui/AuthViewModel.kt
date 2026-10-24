package com.sena.appmobile.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.sena.appmobile.data.LoginRequest
import com.sena.appmobile.data.repository.AuthRepository
import com.sena.appmobile.utils.NetworkResult
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class AuthViewModel : ViewModel() {
    private val repository = AuthRepository()

    private val _loginResult = MutableStateFlow<NetworkResult<Map<String, Any>>>(NetworkResult.Loading())
    val loginResult: StateFlow<NetworkResult<Map<String, Any>>> = _loginResult

    fun login(request: LoginRequest) {
        viewModelScope.launch {
            _loginResult.value = NetworkResult.Loading()
            try {
                val response = repository.login(request)
                if (response.isSuccessful && response.body() != null) {
                    _loginResult.value = NetworkResult.Success(response.body()!!)
                } else {
                    _loginResult.value = NetworkResult.Error("Credenciales incorrectas o error en el servidor")
                }
            } catch (e: Exception) {
                _loginResult.value = NetworkResult.Error(e.localizedMessage ?: "Error de conexión")
            }
        }
    }
}