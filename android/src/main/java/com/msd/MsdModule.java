package com.msd;

import android.os.Build;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = MsdModule.NAME)
public class MsdModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Msd";
    private final ReactApplicationContext reactContext;

    public MsdModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getBundleIdentifier(Promise promise) {
        try {
            promise.resolve(reactContext.getApplicationContext().getPackageName());
        } catch (Exception e) {
            promise.reject("E_BUNDLE_ID_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void isConnectedToInternet(Promise promise) {
        try {
            boolean isConnected = false;
            ConnectivityManager connectivityManager = (ConnectivityManager) reactContext.getSystemService(Context.CONNECTIVITY_SERVICE);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                NetworkCapabilities networkCapabilities = connectivityManager.getNetworkCapabilities(connectivityManager.getActiveNetwork());
                isConnected = networkCapabilities != null &&
                        (networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
                        networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) ||
                        networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) ||
                        networkCapabilities.hasTransport(NetworkCapabilities.TRANSPORT_BLUETOOTH));
            } else {
                isConnected = connectivityManager.getActiveNetworkInfo() != null && connectivityManager.getActiveNetworkInfo().isConnected();
            }
            promise.resolve(isConnected);
        } catch (Exception e) {
            promise.reject("E_NETWORK_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void setItem(String key, String value, Promise promise) {
        try {
            SharedPreferences sharedPreferences = reactContext.getSharedPreferences("DeviceInfoPrefs", Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString(key, value);
            editor.apply();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("E_STORAGE_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getItem(String key, Promise promise) {
        try {
            SharedPreferences sharedPreferences = reactContext.getSharedPreferences("DeviceInfoPrefs", Context.MODE_PRIVATE);
            String value = sharedPreferences.getString(key, null);
            promise.resolve(value);
        } catch (Exception e) {
            promise.reject("E_STORAGE_ERROR", e.getMessage());
        }
    }
}
