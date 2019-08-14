let Navbar = {    
    render : async () => { 
        let view = /*html*/`
     <nav>
      <nav id = "navbar-dsk" class = "navbar">
      <a href = "./#/"><img src = "img/Logo-white.png" id = "logo"></a><br>
       <ul id="nav-mobile" class="right ">
         <li class="size-li"><a href = "./#/login" id = "btn-login" class = "linksToJoin" >Inicia sesión</a></li>
         <li class="size-li"><a href = "./#/register" id = btn-register class = "linksToJoin"> Crea tu cuenta</a>
         </li>
       </ul>
      </nav>
     <!--  mobile version -->
     <nav id = "navbar-mbl" class = "navbar">
     <ul id="nav-mobile" class="right">
      <li>
      <a href = "./#/"><img src = "img/Logo-white.png" id = "logo"></a>
      </li>
     </ul>
     </nav>
     </nav>
        `
        return view
    }
    ,after_render : async () => {}
}

export default Navbar;