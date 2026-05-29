# GitHub Pages 배포 (중요)

이 프로젝트는 **Next.js 정적 빌드(`pnpm build` → `out/`)** 로 배포합니다.  
**Jekyll / `docs` 폴더 사이트가 아닙니다.**

## 지금 CI가 실패하는 이유

로그에 `jekyll-theme-primer`, `assets/css/style.scss`, `Source: /github/workspace/docs` 가 보이면  
**저장소 Settings → Pages** 가 예전 방식(**`docs` 브랜치/폴더 + Jekyll**)으로 되어 있습니다.

현재 레포의 `docs/`에는 `style.scss`가 없어서 Jekyll이 실패합니다.

## 해결 (GitHub 웹에서 1회)

1. 저장소 → **Settings** → **Pages**
2. **Build and deployment**
   - **Source: GitHub Actions** ← 이걸로 선택
   - (Deploy from a branch / `docs` 폴더 + Jekyll **사용하지 마세요**)
3. 저장

## 배포 URL

GitHub Pages 프로젝트 사이트는 `https://<user>.github.io/<repository-name>/` 입니다.  
빌드 시 `basePath` / `assetPrefix`는 **저장소 이름**과 같아야 합니다 (워크플로에서 `NEXT_PUBLIC_BASE_PATH=/<repo>` 설정).

| 저장소 | 접속 URL | basePath |
|--------|----------|----------|
| `dmsej108/portal-main` | https://dmsej108.github.io/portal-main/ | `/portal-main` |
| `zzous/potal-admin` | https://zzous.github.io/potal-admin/ | `/potal-admin` |

JS/CSS 404 (`/_next/static/...`)가 나오면 basePath와 실제 Pages URL의 경로가 다른 경우가 많습니다.

## 배포 워크플로

- 브랜치: `master` push
- 워크플로: `.github/workflows/deploy.yml`
- `enable_jekyll: false`, `publish_dir: ./out`

## 개발 문서

레포 안 개발 문서는 `dev-docs/` (배포와 무관)에 둡니다.
