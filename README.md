# ポートフォリオサイト

椎久智也さんのポートフォリオサイトです。

## 📧 お問い合わせフォームの設定（3ステップ）

フォームから送信された内容を自分のメールで受け取る設定方法：

### ✅ ステップ1: Formspreeでアカウント作成

1. https://formspree.io/ にアクセス
2. 無料アカウントを作成（GitHubログイン可）

### ✅ ステップ2: フォーム作成とエンドポイント取得

1. 「New Form」をクリック
2. フォーム名を入力（例: Portfolio Contact）
3. 受信したいメールアドレスを設定
4. 作成後に表示される **エンドポイント** をコピー  
   形式: `https://formspree.io/f/xxxxxx`

### ✅ ステップ3: index.htmlを編集

`index.html` の約835行目、フォームタグを見つけて：

```html
<!-- 変更前 -->
<form
  class="contact-form"
  id="contactForm"
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  <!-- 変更後（YOUR_FORM_IDをあなたのIDに置き換え） -->
  <form
    class="contact-form"
    id="contactForm"
    action="https://formspree.io/f/xxxxxx"
    method="POST"
  ></form>
</form>
```

以上！これでフォーム送信後、あなたのメールに通知が届きます。

---

### 📝 補足

- **無料プラン**: 月50件まで送信可能
- **スパム対策**: Formspreeが自動で対応
- **確認**: 初回送信時にFormspree側で確認が必要な場合があります
