//mongoose를 이용한 account 모델링

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs' // 계정 인증 부분이기 때문에 암호화사용

const Schema = mongoose.Schema; // Data의 틀이 됨

const Account = new Schema({ // Account는 이렇게 생겼다는 것을 정함
    username: String,
    password: String, 
    created: { type: Date, default: Date.now }
});

// generates hash
// Schema에 메소드를 지정. 나중에 모델에서 실행 가능. arrow func 사용불가.
// password를 인자로 받아 암호화된 password를 리턴.
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8); 
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// 틀을 가지고 실제 데이터베이스에 접근 (model 클래스)
// 첫번째 인수: collection name. 복수형인 accounts컬렉션이 만들어진다.
export default mongoose.model('account', Account); 