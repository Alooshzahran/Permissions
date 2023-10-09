using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _05072023_1417 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModuleProperties_Role");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 17, 20, 764, DateTimeKind.Local).AddTicks(9037));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 17, 20, 764, DateTimeKind.Local).AddTicks(9046));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 17, 20, 764, DateTimeKind.Local).AddTicks(9048));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 17, 20, 764, DateTimeKind.Local).AddTicks(9049));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 11, 17, 20, 764, DateTimeKind.Utc).AddTicks(8886));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ModuleProperties_Role",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModulePropertiesID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationUserID = table.Column<int>(type: "int", nullable: false),
                    DeleteDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeleteUserID = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ModifyingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifyingUserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModuleProperties_Role", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ModuleProperties_ModuleProperties_Role",
                        column: x => x.ModulePropertiesID,
                        principalTable: "ModuleProperties",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Role_ModuleProperties_Role",
                        column: x => x.RoleID,
                        principalTable: "Role",
                        principalColumn: "ID");
                });

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(804));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(815));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(817));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 14, 9, 23, 271, DateTimeKind.Local).AddTicks(818));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 7, 5, 11, 9, 23, 271, DateTimeKind.Utc).AddTicks(717));

            migrationBuilder.CreateIndex(
                name: "IX_ModuleProperties_Role_ModulePropertiesID",
                table: "ModuleProperties_Role",
                column: "ModulePropertiesID");

            migrationBuilder.CreateIndex(
                name: "IX_ModuleProperties_Role_RoleID",
                table: "ModuleProperties_Role",
                column: "RoleID");
        }
    }
}
