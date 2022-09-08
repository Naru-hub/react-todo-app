# React で作成した Todo アプリ

React の勉強を開始して初めて作成したアプリです。  
CRUD 機能とステータス別でフィルター機能をつけました。

https://react-todo-app-beige-mu.vercel.app/

## 主な機能

### `Todoを作成`

<img width="869" alt="todo 2022-09-04 21 50 34" src="https://user-images.githubusercontent.com/81672054/189018894-8d2ee181-7a8f-44cb-9698-0c9e118b4268.png">

### `Todoを編集`

<img width="942" alt="todo編集 2022-09-04 21 51 20" src="https://user-images.githubusercontent.com/81672054/189019032-b407a738-44a4-47bc-9584-d89f208e4aa6.png">

### `Todoをステータス別に出し分け`

・ステータスが`未着手`の Todo 

<img width="770" alt="ステータス未着手 2022-09-04 21 51 52" src="https://user-images.githubusercontent.com/81672054/189019146-9c0911be-a416-491d-b043-aac4b1d3ee99.png"> 

 ・ステータスが`進行中`の Todo 
 
<img width="763" alt="ステータス進行中 2022-09-04 21 52 01" src="https://user-images.githubusercontent.com/81672054/189019478-66e5f83f-7868-4225-88b0-3ee2b3d9a5c0.png"> 

・ステータスが`完了`の Todo 

<img width="796" alt="ステータス完了 2022-09-04 21 52 10" src="https://user-images.githubusercontent.com/81672054/189019675-f9ea04fd-1148-4473-b96a-1960e673a427.png">

↑ ステータス別で出した後の Todo のステータスを変更した場合もその変更したステータスの方に Todo が移るように useEffect で随時監視、変更を反映できるようにしています。

### `Todoを削除`

<img width="738" alt="削除 2022-09-04 22 24 10" src="https://user-images.githubusercontent.com/81672054/189019828-f68782cf-543d-4846-9178-713d8768288b.png"> 

ステータスが`完了`になったTodoを削除 

<img width="732" alt="スクリーンショット 2022-09-04 22 33 35" src="https://user-images.githubusercontent.com/81672054/189019861-59976182-00a5-490b-80cf-6933587487ff.png">

### まとめ

component に分けるなど今後まだまだ改善の余地はありますが、CRUD 機能や Todo を出し分けるフィルター機能、  
useEffect を利用して Todo のステータスを随時監視し、ステータス別に変更を反映させる処理など、アプリ作成前より作成後の方が Hooks を使っての React の基本的な技術の理解が深まりました。
