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
	isInit = jni_init_client_lib() == 0;
    }
    
    @Override
    public String getName() {
	return "ClientLogin";
    }

    @ReactMethod
    public String callTest() {
	return "Success";
    }

    @ReactMethod
    public void promiseTest(Promise p) {
	p.resolve("Success");
    }
    
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
	    p.resolve(retval);
	} else {
	    p.reject("ERR", "Library not initialized");
	}
    }

    @ReactMethod
    public void generateRegistration(String userpass, Promise p) {
	if (isInit) {
	    RegistrationValues rvals = jni_generate_registration(userpass);
	    p.resolve("Success");
	} else {
	    p.reject("ERR", "Library not initialized");
	}
    }

    @ReactMethod
    public void generateKey(String username, String userpass, String aHex,
			    String AHex, String BHex, String sHex,
			    String nHex, Promise p) {
	if (!isInit) {
	    p.reject("ERR", "Library not initialized");
	    return;
	}
	
	if (aHex.length() != 2*jni_lib_bytes_size() ||
	    AHex.length() != 2*jni_lib_bytes_size() ||
	    BHex.length() != 2*jni_lib_bytes_size() ||
	    sHex.length() != 2*jni_lib_bytes_size() ||
	    AHex.length() != 2*jni_lib_key_size() ||
	    username.length() > 79) {
	    p.reject("ERR", "Invalid data passed in");
	}

	VerificationValues vvals = jni_generate_ck(username, userpass, hexToBytes(aHex),
						   hexToBytes(AHex), hexToBytes(BHex),
						   hexToBytes(sHex), hexToBytes(nHex));
	WritableMap retval = new WritableNativeMap();
	retval.putString("ck", bytesToHex(vvals.ck));
	retval.putString("hv", bytesToHex(vvals.hv));
	retval.putString("m1", bytesToHex(vvals.m1));
	retval.putString("m2", bytesToHex(vvals.m2));
	p.resolve(retval);
	
    }
    
    public static native int jni_init_client_lib();

    public static native int jni_lib_bytes_size();
    
    public static native int jni_lib_hash_size();
    
    public static native int jni_lib_key_size();

    public static native RegistrationValues jni_generate_registration(String user_pass);
    
    public static native AValues jni_generate_a();
    
    public static native VerificationValues
	jni_generate_ck(String username, String user_pass, byte[] a,
			byte[] A, byte[] B, byte[] s, byte[] n);

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

    public static byte[] hexToBytes(String s) {
        byte[] bytes = new byte[s.length()/2];
        for(int i = 0; i < s.length(); i+=2) {
            bytes[i/2] = (byte) ((Character.digit(s.charAt(i), 16) << 4) +
                                 Character.digit(s.charAt(i+1), 16));
        }
        return bytes;
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
    public VerificationValues(byte[] cki, byte[] m1i, byte[] m2i, byte[] hvi) {
	ck = cki;
	m1 = m1i;
	m2 = m2i;
	hv = hvi;
    }

    public byte[] ck;
    public byte[] m1;
    public byte[] m2;
    public byte[] hv;
}
