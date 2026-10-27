import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Start empty so server and client render match; storage is read after mount
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate session from localStorage (browser only)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('vednetra_auth_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      setUser(null);
    }
    setToken(localStorage.getItem('vednetra_auth_token') || null);
  }, []);

  // Synchronize auth state with backend on mount
  useEffect(() => {
    const checkMe = async () => {
      const storedToken = localStorage.getItem('vednetra_auth_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            localStorage.setItem('vednetra_auth_user', JSON.stringify(data.user));
          }
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.warn('Auth check skipped / offline:', err);
      } finally {
        setLoading(false);
      }
    };

    checkMe();
  }, []);

  const saveAuthSession = (authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem('vednetra_auth_token', authToken);
    localStorage.setItem('vednetra_auth_user', JSON.stringify(authUser));
  };

  /**
   * Client: Send OTP
   */
  const sendClientOtp = async (phone, countryCode = '+91') => {
    const res = await fetch('/api/auth/client/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, countryCode })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'ओटीपी भेजने में असमर्थ');
    }
    return data;
  };

  /**
   * Client: Verify OTP
   */
  const verifyClientOtp = async (phone, otp, name, countryCode = '+91') => {
    const res = await fetch('/api/auth/client/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, countryCode, otp, name })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'ओटीपी सत्यापन विफल');
    }
    saveAuthSession(data.token, data.user);
    return data;
  };

  /**
   * Panditji & Admin: Email + Password Login
   */
  const loginWithCredentials = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'लॉगिन विफल');
    }
    saveAuthSession(data.token, data.user);
    return data;
  };

  /**
   * Panditji: Request Forgot Password Reset Link
   */
  const requestForgotPassword = async (email) => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'पासवर्ड रीसेट लिंक भेजने में असमर्थ');
    }
    return data;
  };

  /**
   * Panditji: Reset Password with Token
   */
  const resetPassword = async (resetToken, newPassword) => {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: resetToken, newPassword })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'पासवर्ड रीसेट विफल');
    }
    return data;
  };

  /**
   * Client: Fetch own bookings
   */
  const fetchMyBookings = async () => {
    if (!token) return [];
    const res = await fetch('/api/auth/my-bookings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
    return [];
  };

  /**
   * Logout
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('vednetra_auth_token');
    localStorage.removeItem('vednetra_auth_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isClient: user?.role === 'client',
    isPanditji: user?.role === 'panditji',
    isAdmin: user?.role === 'admin',
    isStaff: user?.role === 'panditji' || user?.role === 'admin',
    sendClientOtp,
    verifyClientOtp,
    loginWithCredentials,
    requestForgotPassword,
    resetPassword,
    fetchMyBookings,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
