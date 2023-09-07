package kr.lcm.util;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
 
public class SMTPAuthenticatior extends Authenticator{
 
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
    	//iaqiauclykvpccws
        return new PasswordAuthentication("LoLClanManager@gmail.com","iaqiauclykvpccws");
    }
}