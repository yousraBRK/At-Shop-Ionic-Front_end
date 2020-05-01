import { NgModule } from '@angular/core';
import { MoreComponent } from './more/more';
import { MoreUserComponent } from './more-user/more-user';
@NgModule({
	declarations: [MoreComponent,
    MoreUserComponent],
	imports: [],
	exports: [MoreComponent,
    MoreUserComponent]
})
export class ComponentsModule {}
