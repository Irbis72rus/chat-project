const express = require('express');
const authRouter = require('./authRouter');
// const PORT = process.env.PORT || 5000;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use("/auth", authRouter);



const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
  //Вытащили параметр id и используем его как roomId
  const { id: roomId } = req.params;
  //Когда придет get запрос на сервак берем из комнаты пользователей и сообщения. Возвращаем объект
  //Если нашли комнату с указанным id, то создаем объект иначе передаем пустые массивы юзеров и сообщений
  const obj = rooms.has(roomId)
    ? {
      users: [...rooms.get(roomId).get('users').values()],
      messages: [...rooms.get(roomId).get('messages').values()],
    }
    : { users: [], messages: [] };
  res.json(obj);
});

//Отправляем запрос на проверку комнаты, если комната не существует - создаем её с 2мя атрибутами
app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.send();
});

io.on('connection', (socket) => {
  //Область и тип видимости в названии метода
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    //Отпрвка запроса вопределенную комнату
    socket.join(roomId);
    //В комнате ищем юзеров и передаем socket.id для конкретного юзера
    rooms.get(roomId).get('users').set(socket.id, userName);
    //Получаем имена пользователей в комнате
    const users = [...rooms.get(roomId).get('users').values()];
    //Оповещаем всех в этой комнате о подключении. Метод to указывает на комнату, а emit отправку всем. Брудкаст - кроме себя
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomId).get('messages').push(obj);
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj);
  });

  //Проходим по всем комнатам и проверяем кто из пользователей вышел
  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      //Если пользователь вышел из комнаты, получаем актуальный список пользователей и сообщаем остальным
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });

  console.log('user connected', socket.id);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Сервер запущен!`);
});

// const start = () => {
//   try {
//       app.listen(PORT, () => console.log(`server started on port ${PORT}`))
//   } catch (e) {
//     console.log(e)
//   }
// }

// start();