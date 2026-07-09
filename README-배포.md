# seodang.app 배포 가이드 (GitHub Pages)

`site/` 폴더 = 홈페이지 전체 (index.html 랜딩 + privacy.html + terms.html).
.app 도메인은 HTTPS가 강제되는데, GitHub Pages가 인증서를 자동 발급하므로 딱 맞다.

## 1. GitHub 저장소 만들기 (사이트 전용, 5분)

```bash
cd ~/seodang/site
git init
git add .
git commit -m "서당 홈페이지"
# GitHub에서 새 repo 생성 (예: seodang-site, Public) 후:
git remote add origin https://github.com/<계정>/seodang-site.git
git push -u origin main
```

## 2. GitHub Pages 켜기

repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save.
1~2분 후 `https://<계정>.github.io/seodang-site/` 로 접속 확인.

## 3. 커스텀 도메인 연결

1. 같은 Pages 설정 화면 → Custom domain 에 `seodang.app` 입력 → Save
   (repo에 CNAME 파일이 자동 생성됨)
2. **DNS 설정** — whois.co.kr 로그인 → 도메인 관리 → seodang.app → 네임서버/DNS 관리
   (부가서비스의 "DNS 레코드 관리"를 사용. 없으면 부가서비스 신청 — 무료):

   | 유형 | 호스트 | 값 |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `<계정>.github.io` |

3. DNS 전파 후(수분~수시간) Pages 설정에서 `Enforce HTTPS` 체크.
   ⚠️ .app 도메인은 HTTPS 없이는 브라우저가 아예 열지 않으므로 이 단계까지 완료해야 접속 가능.

## 4. 확인

- https://seodang.app → 랜딩
- https://seodang.app/privacy.html → 개인정보처리방침 (Play Console에 입력할 URL)
- https://seodang.app/terms.html → 이용약관

## 수정할 때

`site/` 파일 수정 → commit → push 하면 1~2분 내 반영.

## 남은 일

- [ ] 문의 이메일 확정 시 index.html 푸터 + privacy.html + terms.html 의 "[연락처 이메일]"/"준비 중" 치환
- [ ] Play Store 출시 후 index.html 의 "출시 준비 중" 버튼을 스토어 링크로 교체
