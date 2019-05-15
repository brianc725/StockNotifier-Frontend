package com.stocknotifier;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class ClientLoginModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  private boolean isInit;

  static {
    System.loadLibrary("login_client");
  }

  public ClientLoginModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    //isInit = jni_init_client_lib() == 0;
  }

  @Override
  public String getName() {
      return "ClientLogin";
  }

  @ReactMethod
  public void test(Promise p) {
      p.resolve("Yay!");
  }

  //public native String hello();

  @ReactMethod
  public void generateAs(Promise p) {
    if (isInit) {
	     AValues avals = jni_generate_a();
	     if (avals == null || avals.a == null) {
	         p.reject("ERR", "Could not generate as");
	          return;
	     }
	     WritableMap retval = new WritableNativeMap();
	       retval.putString("a", bytesToHex(avals.a));
	        retval.putString("A", bytesToHex(avals.A));
	        //p.resolve(retval);
          p.resolve("Test done");
      } else {
	  p.reject("ERR", "Library not initialized");
      }
  }

  public static native int jni_init_client_lib();

  public static native int jni_lib_bytes_size();

  public static native int jni_lib_hash_size();

  public static native RegistrationValues jni_generate_registration(String user_pass);

  public static native AValues jni_generate_a();

  public static native VerificationValues
jni_generate_cs(String user_pass, byte[] a,
    byte[] A, byte[] B, byte[] s);

  private final static char[] hexArray = "0123456789abcdef".toCharArray();

  public static String bytesToHex(byte[] bytes) {
      char[] hexChars = new char[bytes.length * 2];
      for ( int j = 0; j < bytes.length; j++ ) {
          int v = bytes[j] & 0xFF;
          hexChars[j * 2] = hexArray[v >>> 4];
          hexChars[j * 2 + 1] = hexArray[v & 0x0F];
      }
      return new String(hexChars);
  }
}

class RegistrationValues {
    public RegistrationValues(byte[] si, byte[] vi) {
	s = si;
	v = vi;
    }

    public byte[] s;
    public byte[] v;
}

class AValues {
    public AValues(byte[] ai, byte[] Ai) {
	a = ai;
	A = Ai;
    }

    public byte[] a;
    public byte[] A;
}

class VerificationValues {
    public VerificationValues(byte[] m1i, byte[] m2i) {
	m1 = m1i;
	m2 = m2i;
    }

    public byte[] m1;
    public byte[] m2;
}
