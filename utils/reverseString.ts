export default function reverseWords(str: string | any[]) {
    let st = [];
 
    // Traverse given string and push all characters
    // to stack until we see a space.
    for (let i = 0; i < str.length; ++i) {
        if (str[i] != ' ')
            st.unshift(str[i]);
 
        // When we see a space, we print contents
        // of stack.
        else {
            while (st.length != 0) {
                console.log(st[0]);
               st.shift();
            }
        }
    }
 
    // Since there may not be space after
    // last word.
    while (st.length != 0) {
        console.log(st[0]);
        st.shift();
    }
}