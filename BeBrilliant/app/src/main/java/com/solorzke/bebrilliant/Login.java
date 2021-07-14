package com.solorzke.bebrilliant;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class Login extends AppCompatActivity implements View.OnClickListener {

    private EditText ACCESS_TOKEN;
    private Button LOGIN_BTN;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ACCESS_TOKEN = findViewById(R.id.ACCESSTOKEN);
        LOGIN_BTN = findViewById(R.id.LOGINBTN);
    }

    @Override
    protected void onStart() {
        super.onStart();
        LOGIN_BTN.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        switch(view.getId()) {
            case R.id.LOGINBTN:

        }
    }
}