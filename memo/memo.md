## EC2 인스턴스 생성 (linux 프리티어 / region: 서울)

## EC2 생성 보안그룹 (원격 접속 허용 0.0.0.0)

## EC2 키페어 생성 및 다운로드

## 탄력적 IP 생성 및 EC2 인스턴스와 연결

## EC2 연결방법

### 접속 방법

ssh -v -i <키페어경로/키페어이름.pem> ec2-user@<퍼블릭 IPv4 DNS>
ssh -v -i /Users/hongjinhyeok/redmax45/aws-key-pair/chaining-aws.pem ec2-user@ec2-13-124-53-30.ap-northeast-2.compute.amazonaws.com

### permission denied 뜰 경우

chmod 400 <키페어경로/키페어이름.pem>
chmod 400 /Users/hongjinhyeok/downloads/chaining-aws.pem

## nvm 설치

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm 활성화
. ~/.nvm/nvm.sh
source ~/.nvm/nvm.sh

## node 설치

nvm install node
node -v
npm -v

## yarn 설치 (npm)

npm install yarn -g

## yarn 설치 (curl)

curl -o- -L https://yarnpkg.com/install.sh | bash

## git clone

git clone https://github.com/ragnarok-forU/chaining-server.git

## git private 저장소 로그인 생략하기

git remote set-url origin https://<your-access-token>@github.com/username/repo.git

trouble shooting
기존에 설치했던 mysql57-community-release-el7-11.noarch와 충돌
yum remove mysql57-community-release-el7-11.noarch

스크린샷 참고
sudo yum list installed | grep mysql
sudo yum remove mysql80-community-release.noarch
sudo yum clean all --verbose
sudo yum update
rpm -Uvh https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm
sed -i 's/enabled=1/enabled=0/' /etc/yum.repos.d/mysql-community.repo
yum --enablerepo=mysql80-community install mysql-community-server

GPG ERROR

import the new GPG key
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

– Re-run STEP #3 Install MySQL Community Server
yum --enablerepo=mysql80-community install mysql-community-server

mysql -V
Double check that no errors when running yum update
sudo yum update

sudo systemctl start mysqld
sudo systemctl status mysqld

## characterset 설정

vim /etc/my.cnf

```bash
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
bind-address=0.0.0.0
```

## 변경 내용 적용

FLUSH PRIVILEGES;

## mysql 재시작

systemctl restart mysqld

## mysql 임시 비밀번호 (root@localhost: <임시 비밀번호>)

cat /var/log/mysqld.log | grep

## mysql root 계정 접속

mysql -u root -p

## root 비밀번호 변경

ALTER user 'root'@'localhost' identified with mysql_native_password by '새 비밀번호';

## User 생성

CREATE USER 'hongjinhyeok'@'localhost' IDENTIFIED BY 'Gonnabea1right!';

## 로컬호스트 -> 원격 접속 허용

UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='hongjinhyeok';
UPDATE mysql.db SET Host='%' WHERE Host='localhost' AND User='hongjinhyeok';

## 권한 부여

GRANT ALL PRIVILEGES ON _._ to 'hongjinhyeok'@'%';

## 변경 내용 적용

FLUSH PRIVILEGES;

## mysql 재시작

systemctl restart mysqld

## 호스트명은 탄력적 IP주소로 접근할 것.
