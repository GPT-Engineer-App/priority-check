import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
        <Flex mb={4}>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button ml={2} onClick={addTask} colorScheme="blue">Add</Button>
        </Flex>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
            <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
            <Flex>
              <Button onClick={() => toggleTaskCompletion(task.id)} size="sm" colorScheme={task.isCompleted ? 'purple' : 'green'}>
                <FaCheckCircle />
              </Button>
              <Button onClick={() => removeTask(task.id)} size="sm" colorScheme="red" ml={2}>
                <FaTrash />
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;