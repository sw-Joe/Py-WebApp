<script>
    import fastapi from "../lib/api"
    import { link } from 'svelte-spa-router'

    let question_list = []

    // backend 서버에 요청
    fastapi('get', '/api/question/list', {}, (json) => {
        question_list = json
    })
</script>

<ul>
    {#each question_list as question}
        <li><a use:link href="/detail/{question.id}">{question.subject}</a></li>
    {/each}
</ul>