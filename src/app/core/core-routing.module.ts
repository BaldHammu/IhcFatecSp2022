import { NgModule } from '@angular/core'
import { RouterModule, Routes} from '@angular/router'
import { LoginComponent } from '../login/login/login.component'
import { RegisterComponent } from '../register/register.component'
import { CoreComponent } from './core.component'

const routes:Routes =[
    {path:'', component:CoreComponent, children:[
        {path:'login', component:LoginComponent},
        {path:'registrar-se', component:RegisterComponent}]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CoreRoutingModule{}