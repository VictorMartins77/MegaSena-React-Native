import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';

const MegaSenaApp = () => {
  const [userNumbers, setUserNumbers] = useState([]);
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState('');

  const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  };

  const checkResults = () => {
    const randomNumbers = generateRandomNumbers();
    setResult(randomNumbers);

    const matches = userNumbers.filter(num => randomNumbers.includes(num)).length;

    if (matches === 6) {
      setMessage('Parabéns! Você acertou a Sena!');
    } else if (matches === 5) {
      setMessage('Você acertou a Quina!');
    } else if (matches === 4) {
      setMessage('Você acertou a Quadra!');
    } else {
      setMessage('Não ganhou, tente novamente.');
    }
  };

  const handleNumberPress = (num) => {
    if (userNumbers.includes(num)) {
      setUserNumbers(userNumbers.filter(n => n !== num));
    } else if (userNumbers.length < 6) {
      setUserNumbers([...userNumbers, num]);
    } else {
      Alert.alert('Você só pode selecionar 6 números.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/images.jpeg')} style={styles.logo} />
      <View style={styles.grid}>
        {[...Array(60)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              userNumbers.includes(index + 1) && styles.selectedButton
            ]}
            onPress={() => handleNumberPress(index + 1)}
          >
            <Text style={styles.buttonText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Pressable style={styles.send} onPress={checkResults}>
        <Text style={styles.text}>Verificar Resultado</Text>
      </Pressable>
      {result.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Números sorteados: {result.join(', ')}</Text>
          <Text style={styles.resultText}>{message}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: 'lightgreen',
  },
  buttonText: {
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  send: {
    marginTop: 10,
    backgroundColor: '#3f9568',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MegaSenaApp;