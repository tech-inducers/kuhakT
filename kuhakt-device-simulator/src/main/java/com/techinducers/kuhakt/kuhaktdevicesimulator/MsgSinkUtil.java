package com.techinducers.kuhakt.kuhaktdevicesimulator;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.SubscribableChannel;

@EnableBinding(MsgSinkUtil.InputChannel.class)
public class MsgSinkUtil {
	
    @StreamListener(InputChannel.SINK)
    public void handle(String message) {
        System.out.println("new msg:" + message + ", from worker :" + Thread.currentThread().getName());
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public interface InputChannel {
        String SINK = "message-sink";

        @Input(SINK)
        SubscribableChannel sink();
    }

}
