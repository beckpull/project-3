import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useMutation } from '@apollo/client';
import { ADD_WORKOUT_PLAN } from '../utils/mutations';

// Define the mutation

export default function NewWorkoutForm() {
    const [name, setName] = useState('');
    const [goals, setGoals] = useState('');

    const [addWorkoutPlan, { error, data }] = useMutation(ADD_WORKOUT_PLAN);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Adding workout plan", name, goals);

        if (!name || !goals) {
            Alert.alert('Error', 'All fields are required');
            return;

        };

        setName('');
        setGoals('');
        try {
            const { data } = await addWorkoutPlan({
                variables: {
                    name,
                    // goals,
                },
            });
            console.log(data);
            Alert.alert('Success', 'Next, add exercises to your workout plan!');
            setName('');

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add workout plan');
        }

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style={styles.container}>
                    <Text style={styles.h1}>Create a New Workout Plan</Text>
                    <Text style={styles.label}>Workout Plan Name:</Text>
                   
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Example: 5K Training Plan"
                    />
                    <Text style={styles.label}>Goals:</Text>
                    
                    <TextInput
                        style={styles.input}
                        value={goals}
                        onChangeText={setGoals}
                        placeholder="Example: Run a 5K in under 30 minutes"
                    />

                </View>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create Workout Plan</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    success: {
        color: 'green',
        marginTop: 10,
    },



    button: {
        backgroundColor: '#003566',
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },

});

